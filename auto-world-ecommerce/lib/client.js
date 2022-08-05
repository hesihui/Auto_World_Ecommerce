import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '0r68kym5',
    dataset: 'production',
    apiVersion: '2022-08-04',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// sanity image builder steup
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);