# Jersey boundary source, v01

- Data: Natural Earth, 1:10m Admin 0 countries, Jersey (`ADM0_A3=JEY`).
- Immutable source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/9380cca83db5f9aef52d5e762765100745f84b27/geojson/ne_10m_admin_0_countries.geojson
- Source commit: `9380cca83db5f9aef52d5e762765100745f84b27` (file's latest commit dated 2022-05-13).
- Retrieved: 2026-10-29T07:54:41+00:00.
- Original global file: 13,287,234 bytes; kept in `/tmp/ecology12-01-natural-earth-countries.geojson`, not shipped with the prototype.
- Original global file SHA-256: `239eec57ac17f100a11e2536cffc56752c318b50ae765b0918ff7aab4ce8f255`.
- Geometry canonical JSON SHA-256: `7823c39a3f9427574371c314575ea5e771d2a5216e7a537f62c4516f1b7f47f5`.
- License: public domain, verified at https://www.naturalearthdata.com/about/terms-of-use/ . Natural Earth permits use and modification without permission or mandatory credit.

## Extraction and use

`data/jersey-boundary-v01.json` contains one GeoJSON Polygon. Its geometry is copied from the source without changing any coordinate. The ring has 47 positions including its repeated closing position. The bbox, in `[west, south, east, north]` order, is `[-2.242014, 49.171332, -2.00829, 49.267035]`. Longitude is the first coordinate.

`source/jersey-natural-earth-extracted-original-v01.geojson` preserves the complete source feature properties and geometry after JSON parsing. It is an extracted feature, not a byte-for-byte copy of the global file.

This is generalized cartography for regional context. It does not identify a reported observation, sampling location, precise coastline survey, or legal boundary. Draw the island region itself. Do not draw a sighting pin.

The paper Table 2 regional geocode supplied by the case research is only recorded in the output's `provenance.paperRegionalReferenceOnly` metadata with `render: false`. It is not a GeoJSON Point. An even-odd polygon check confirms the reference lies inside this Jersey boundary. The check confirms geographic consistency only; it does not turn that regional geocode into an observation location.

## Verification

- Downloaded the immutable commit URL and confirmed its SHA-256 equals the initially retrieved master source.
- Found exactly one `ADM0_A3=JEY` feature.
- Confirmed one Polygon ring, closed by exact coordinate equality.
- Reopened the saved asset and compared its geometry to the extracted source feature.
