import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map(album => {
           return {type: 'Album', id: album.id};
          });
          tags.push({type: 'UsersAlbums', id: user.id});
          return tags;
        },
        query: user => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
      addAlbums: builder.mutation({
        invalidatesTags: (result, error, user) => [{type: 'UsersAlbums', id: user.id}],
        query: user => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => [{type: 'Album', id: album.id}],
        query: album => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { 
  useFetchAlbumsQuery,
  useAddAlbumsMutation, 
  useRemoveAlbumMutation } = albumsApi;
export { albumsApi };