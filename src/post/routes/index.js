import PostListLayout from '../layouts/PostListLayout';
import PostLayout from '../layouts/PostLayout';

let postRoutes = [
  {
    path: '/',
    name: 'AllPostList',
    component: PostListLayout
  },
  {
    path: '/post/:year/:month/:date/:filename',
    name: 'PostDetail',
    component: PostLayout
  },
  {
    path: '/tags',
    name: 'TagList',
    component: PostListLayout
  },
  {
    path: '/category/:category',
    name: 'FilterByCategoryPostList',
    component: PostListLayout,
    meta: {
      filter: {
        key: 'category',
        type: 'category'
      }
    }
  },
  {
    path: '/tag/:tag',
    name: 'FilterByTagPostList',
    component: PostListLayout,
    meta: {
      filter: {
        key: 'tag',
        type: 'tags'
      }
    }
  }
];

export default postRoutes;
