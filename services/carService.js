import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
    reducerPath: 'carApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getData: builder.query({
            query: (name) => `/posts`,
            providesTags: result => ['Post']
        }),
        createPost: builder.mutation({
            query:(post) => ({
                url:`/posts`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query:(post) => ({
                url:`/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query:(post) => ({
                url:`/posts/${post.id}`,
                method: 'DELETE',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
    }),
})
export const { useGetDataQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = carApi
