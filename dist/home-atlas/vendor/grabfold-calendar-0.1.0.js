/*! Grabfold 0.1.0 — MIT, Copyright (c) 2026 JavocSoft. See grabfold-LICENSE.txt. */
(() => {
'use strict';
/**
 * The geometry of a page caught mid-turn.
 *
 * A page does not pivot as a rigid plane hinged on the spine. It folds: a
 * crease forms and travels across the sheet, the part beyond it lies back on
 * the part before it, and the free edge moves at twice the speed of the crease
 * because it has to cover the same ground twice.
 *
 * Where the crease falls is not a choice. Take hold of the sheet at a point
 * and move that point somewhere else: the paper can only reach the new
 * position by folding about the **perpendicular bisector** of the two, because
 * every point of the crease has to stay the same distance from both. So the
 * crease is a straight line at an angle the drag decides, and holding the
 * sheet anywhere along its edge and arcing the hand tilts it, which is what a
 * page really does. That is the whole reason grabfold can let a page be taken
 * hold of anywhere rather than only by a corner.
 *
 * Everything here is pure arithmetic on points, with no DOM, so the
 * invariants that matter — that the sheet lands square on the facing page,
 * that the two halves stay joined at the crease, that the page never comes
 * off the spine — can be tested.
 */
/** How far the shading reaches from the crease, as a share of a page width. */
const SHADOW_SPAN = 0.42;
/** The roll is the tighter of the two, the way it is in paper. */
const ROLL_SHARE = 0.75;
/**
 * The least the sheet is ever taken to have moved, in pixels.
 *
 * A sheet that has not moved at all has no crease and no direction to give
 * one, but it still has to be drawn: while a turn is running it is the only
 * thing covering the page it is uncovering. Returning nothing for the last
 * frames of an eased return left that page bare and showing through — a blink
 * of the wrong page. So the fold never vanishes; it shrinks to half a pixel
 * and waits to be taken off screen by the book.
 */
const LEAST_MOVE = 0.5;
/**
 * How far the crease may lean from upright, as a tangent — about 58 degrees.
 *
 * The spine already stops the sheet coming unbound, but it leaves one gesture
 * open: take hold of the very corner, where the binding is barely in the way,
 * and drag straight down. The corner swings round the spine on a short arc
 * and the page folds along its own length — real paper, but not a page turn.
 */
const MAX_LEAN = 1.6;
function clamp(value, low, high) {
    return Math.min(high, Math.max(low, value));
}
/**
 * The part of a convex polygon where `side` is not negative.
 *
 * Sutherland and Hodgman: walk the edges, keep the points on the near side,
 * and wherever an edge crosses over, put a point exactly on the line. A
 * rectangle cut by one line comes back with at most five corners.
 */
function clipHalfPlane(polygon, side) {
    const kept = [];
    for (let index = 0; index < polygon.length; index++) {
        const from = polygon[index];
        const to = polygon[(index + 1) % polygon.length];
        const here = side(from);
        const there = side(to);
        if (here >= 0)
            kept.push(from);
        if (here >= 0 !== there >= 0) {
            const at = here / (here - there);
            kept.push({
                x: from.x + (to.x - from.x) * at,
                y: from.y + (to.y - from.y) * at,
            });
        }
    }
    return kept;
}
/** Mirrors a point across the line through `through` with the given normal. */
function reflect(point, through, normal) {
    const square = normal.x * normal.x + normal.y * normal.y;
    const over = ((point.x - through.x) * normal.x + (point.y - through.y) * normal.y) /
        square;
    return {
        x: point.x - 2 * over * normal.x,
        y: point.y - 2 * over * normal.y,
    };
}
/**
 * Lays a shading band along a line, fading away from it.
 *
 * The band is drawn with its own x running away from the crease and its own y
 * running along it, and it is started half its length back so it overshoots
 * the page at both ends however the crease is tilted.
 */
function strip(through, normal, span, length) {
    const size = Math.hypot(normal.x, normal.y);
    // Away from the line, which is the side the shading falls on.
    const acrossX = -normal.x / size;
    const acrossY = -normal.y / size;
    // A CSS rotate sends the element's own y here, so the strip runs this way.
    const alongX = -acrossY;
    const alongY = acrossX;
    return {
        x: through.x - alongX * (length / 2),
        y: through.y - alongY * (length / 2),
        angle: Math.atan2(acrossY, acrossX),
        span,
        length,
    };
}
/**
 * Works out the fold.
 *
 * `progress` drives the horizontal journey and `lift` the tilt, so a turn run
 * from code — which has no pointer and so no lift — comes out as a plain
 * upright fold.
 */
function foldGeometry(input) {
    const { spine, width, height } = input;
    const progress = clamp(input.progress, 0, 1);
    // The sheet is taken hold of at the free edge and carried to the far side of
    // the spine, which is twice the width away: once to reach the spine, and
    // once more to come down the other side.
    const carried = Math.max(LEAST_MOVE, width * 2 * progress);
    const grab = { x: spine === "left" ? width : 0, y: input.grabY };
    const reached = spine === "left" ? width - carried : carried;
    // The sheet is bound at the spine, and binding fixes distance: the point
    // being dragged can never get further from either end of the spine than it
    // already was. Hold to that and the crease can never cross the spine, which
    // is the one line on the page that has to stay put. Let it cross and the
    // whole sheet lifts off the middle of the book, which paper does not do.
    //
    // It also makes the tilt behave on its own. There is no room for one at
    // either end of the turn, so a page lands flat without being told to, and
    // very little room early on, where the smallest wobble would otherwise
    // throw the crease flat and fold the page along its length.
    const spineX = spine === "left" ? 0 : width;
    const gap = reached - spineX;
    const roomAt = (cornerY) => {
        const bound = Math.hypot(width, input.grabY - cornerY);
        return Math.sqrt(Math.max(0, bound * bound - gap * gap));
    };
    const fromTop = roomAt(0);
    const fromBottom = roomAt(height);
    const lean = MAX_LEAN * carried;
    const point = {
        x: reached,
        y: clamp(input.grabY + input.lift, Math.max(-fromTop, height - fromBottom, input.grabY - lean), Math.min(fromTop, height + fromBottom, input.grabY + lean)),
    };
    const normal = { x: point.x - grab.x, y: point.y - grab.y };
    // The crease: every point on it is as far from where the sheet was held as
    // from where it now is.
    const middle = {
        x: (grab.x + point.x) / 2,
        y: (grab.y + point.y) / 2,
    };
    const page = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height },
    ];
    // Negative on the side the fold carries away, which is the grab's own side.
    const side = (at) => (at.x - middle.x) * normal.x + (at.y - middle.y) * normal.y;
    const leaf = clipHalfPlane(page, side);
    const uncovered = clipHalfPlane(page, (at) => -side(at));
    // The folded face is drawn to be read *after* the turn, so its own x runs
    // opposite the sheet's. Mirroring lines the two back up, and mirroring then
    // reflecting is a plain rotation, which is all CSS needs to be told.
    const mirror = (at) => ({ x: width - at.x, y: at.y });
    const carry = (at) => reflect(mirror(at), middle, normal);
    const origin = carry({ x: 0, y: 0 });
    const along = carry({ x: 1, y: 0 });
    const depth = Math.sin(Math.PI * progress);
    const span = SHADOW_SPAN * width * depth;
    const reach = 2 * Math.hypot(width, height);
    return {
        leaf,
        uncovered,
        flap: uncovered.map(mirror),
        place: {
            x: origin.x,
            y: origin.y,
            angle: Math.atan2(along.y - origin.y, along.x - origin.x),
        },
        // On the folded face the crease sits at the mirrored midpoint, and the
        // mirroring turns the normal's x about with it.
        roll: strip(mirror(middle), { x: -normal.x, y: normal.y }, span * ROLL_SHARE, reach),
        cast: strip(middle, normal, span, reach),
        crease: {
            through: middle,
            normal: {
                x: normal.x / Math.hypot(normal.x, normal.y),
                y: normal.y / Math.hypot(normal.x, normal.y),
            },
        },
    };
}
/** How hard everything is shaded: flat at either end, deepest side on. */
function foldDepth(progress) {
    return Math.sin(Math.PI * clamp(progress, 0, 1));
}


/** A clip-path for a polygon in pixels. */
function polygon(points) {
    if (points.length < 3)
        return "polygon(0 0, 0 0, 0 0)";
    return `polygon(${points
        .map((point) => `${point.x.toFixed(2)}px ${point.y.toFixed(2)}px`)
        .join(", ")})`;
}
/** Lays a shading band along a strip. */
function placeBand(band, strip, gradient) {
    band.style.width = `${strip.span.toFixed(2)}px`;
    band.style.height = `${strip.length.toFixed(2)}px`;
    band.style.transform = `translate(${strip.x.toFixed(2)}px, ${strip.y.toFixed(2)}px) rotate(${strip.angle.toFixed(4)}rad)`;
    band.style.backgroundImage = gradient;
}
/**
 * The shadow a page falls into where it curves down into the binding.
 *
 * It is that, more than anything, that makes a flat rectangle read as a page
 * in a book rather than a panel. Shared with the book's static pages so that
 * a sheet and the page it lands as are shaded identically.
 */
function gutterGradient(side, strength) {
    if (strength <= 0)
        return "none";
    const towards = side === "left" ? "to right" : "to left";
    return `linear-gradient(${towards}, rgba(0,0,0,${strength}), rgba(0,0,0,${(strength * 0.34).toFixed(3)}) 8%, rgba(0,0,0,0) 24%)`;
}
function layer(doc, className) {
    const el = doc.createElement("div");
    el.className = className;
    el.style.position = "absolute";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = "100%";
    el.style.height = "100%";
    return el;
}
function overlay(doc, className) {
    const el = doc.createElement("span");
    el.className = className;
    el.style.position = "absolute";
    el.style.left = "0";
    el.style.top = "0";
    el.style.pointerEvents = "none";
    return el;
}
class FoldingSheet {
    constructor(doc, shading) {
        this.shading = shading;
        this.root = doc.createElement("div");
        this.root.className = "grabfold-sheet";
        this.root.setAttribute("aria-hidden", "true");
        Object.assign(this.root.style, {
            position: "absolute",
            top: "0",
            zIndex: "3",
            pointerEvents: "none",
            display: "none",
        });
        // Thrown by the standing fold across the page it has just uncovered, and
        // kept to that page so it stops where the paper stopped.
        this.cast = layer(doc, "grabfold-cast");
        this.cast.style.pointerEvents = "none";
        this.castBand = overlay(doc, "grabfold-band");
        this.castBand.style.transformOrigin = "0 0";
        this.cast.append(this.castBand);
        // Still flat on its own page, cut off where the crease has reached. It
        // has not moved, so it keeps its own page's gutter and no seam shows
        // where the clip cuts it away from the page beneath.
        this.leaf = layer(doc, "grabfold-leaf");
        this.leaf.style.background = "var(--grabfold-paper, #fbf8f1)";
        this.leaf.style.overflow = "hidden";
        this.restingSlot = layer(doc, "grabfold-slot");
        this.leafGutter = layer(doc, "grabfold-gutter");
        this.leafGutter.style.pointerEvents = "none";
        this.leaf.append(this.restingSlot, this.leafGutter);
        // Folded over: carried across the crease by a translate and a rotate about
        // its own top-left corner, and cut back to the crease.
        this.flap = layer(doc, "grabfold-flap");
        this.flap.style.transformOrigin = "0 0";
        this.flap.style.overflow = "hidden";
        this.flap.style.willChange = "transform, clip-path";
        this.turnedSlot = layer(doc, "grabfold-slot");
        this.flapGutter = layer(doc, "grabfold-gutter");
        this.flapGutter.style.pointerEvents = "none";
        this.rollBand = overlay(doc, "grabfold-band");
        this.rollBand.style.transformOrigin = "0 0";
        this.flap.append(this.turnedSlot, this.flapGutter, this.rollBand);
        this.root.append(this.cast, this.leaf, this.flap);
    }
    setShading(shading) {
        this.shading = shading;
    }
    // A folding leaf is always paper, never a cover's outside.
    setOutside() { }
    /** Puts the sheet over a cell: left offset and size in the book's pixels. */
    place(left, width, height) {
        this.root.style.left = `${left}px`;
        this.root.style.width = `${width}px`;
        this.root.style.height = `${height}px`;
    }
    show() {
        this.root.style.display = "block";
    }
    hide() {
        this.root.style.display = "none";
    }
    /** One frame of the fold. */
    draw(frame) {
        const fold = foldGeometry(frame);
        const depth = foldDepth(frame.progress);
        const dark = this.shading.shadow * depth;
        const { spine } = frame;
        this.cast.style.clipPath = polygon(fold.uncovered);
        placeBand(this.castBand, fold.cast, `linear-gradient(to right, rgba(0,0,0,${dark.toFixed(3)}), rgba(0,0,0,0))`);
        this.leaf.style.clipPath = polygon(fold.leaf);
        this.leafGutter.style.background = gutterGradient(spine, this.shading.gutter);
        // Off the table and towards the light, by as much as it is turned: nothing
        // at either end, where it lies as flat as every other page. Set here and
        // not in a stylesheet because it has to run out as the sheet lands, or the
        // page would change colour on the last frame when the real page takes over.
        this.flap.style.backgroundColor = `color-mix(in oklab, var(--grabfold-lift, #ffffff) ${(this.shading.lift * depth).toFixed(1)}%, var(--grabfold-paper, #fbf8f1))`;
        this.flap.style.clipPath = polygon(fold.flap);
        this.flap.style.transform = `translate(${fold.place.x.toFixed(2)}px, ${fold.place.y.toFixed(2)}px) rotate(${fold.place.angle.toFixed(4)}rad)`;
        // The gutter it is heading for, not the one it left: this face lands on
        // the facing page, whose binding is on the other side. Carried in the
        // face's own frame, it arrives already in register.
        this.flapGutter.style.background = gutterGradient(spine === "left" ? "right" : "left", this.shading.gutter);
        // The crease rolling over: dark on the turn, a glint along the top of the
        // roll, dark again in its own shadow.
        placeBand(this.rollBand, fold.roll, `linear-gradient(to right, rgba(0,0,0,${dark.toFixed(3)}) 0%, rgba(0,0,0,${(dark * 0.62).toFixed(3)}) 7%, rgba(255,255,255,${(0.2 * depth).toFixed(3)}) 18%, rgba(0,0,0,${(dark * 0.4).toFixed(3)}) 40%, rgba(0,0,0,0) 100%)`);
    }
}

window.AtlasCalendarFold=Object.freeze({FoldingSheet,foldGeometry,foldDepth,version:'0.1.0'});
})();
