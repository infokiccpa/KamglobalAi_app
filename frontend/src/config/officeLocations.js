/** Office locations for SEO (JSON-LD) and contact page links */
export const OFFICE_LOCATIONS = [
    {
        name: 'Kam Global AI - Kuwait HQ',
        shortName: 'Kuwait City',
        streetAddress: 'Floor 2&6, Al Barsha Complex, Tunis Street, Hawally, Kuwait',
        addressLocality: 'Hawally',
        addressRegion: 'Hawally Governorate',
        addressCountry: 'KW',
        latitude: 29.3331,
        longitude: 48.0286,
        mapsUrl: 'https://maps.google.com/?q=Al+Barsha+Complex+Tunis+Street+Hawally+Kuwait',
    },
    {
        name: 'Kam Global For Digital & AI Media Solutions Private Limited',
        shortName: 'Bengaluru',
        streetAddress:
            '544, 3rd Cross Rd, opposite BDA complex, Ganganagar, P&T Colony, RT Nagar, Bengaluru, Karnataka 560032',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560032',
        addressCountry: 'IN',
        latitude: 13.0209878,
        longitude: 77.593684,
        placeId: 'ChIJvRw5NQAXrjsRlqHTJYRZfKc',
        mapsUrl: 'https://maps.app.goo.gl/soHoBqfEFJ2d8fV69',
    },
];

export function getOfficeLocationsJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Kam Global AI',
        url: 'https://kamglobalai.com',
        location: OFFICE_LOCATIONS.map((office) => ({
            '@type': 'Place',
            name: office.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: office.streetAddress,
                addressLocality: office.addressLocality,
                ...(office.addressRegion && { addressRegion: office.addressRegion }),
                ...(office.postalCode && { postalCode: office.postalCode }),
                addressCountry: office.addressCountry,
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: office.latitude,
                longitude: office.longitude,
            },
            hasMap: office.mapsUrl,
            ...(office.placeId && { identifier: office.placeId }),
        })),
    };
}
