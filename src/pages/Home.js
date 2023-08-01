import PopularPosts from "../components/PopularPosts";
import LatestPosts from "../components/LatestPosts";
import PostsComponent from "../components/PostsComponent";
import posts from '../components/Posts';
import { Container, Box, Typography, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Container sx={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <PostsComponent posts={posts} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#F5F5DC', padding: '1rem' }}>
              <Box sx={{ mb: '1rem' }}>
                <Typography variant="h2">Latest</Typography>
                <LatestPosts posts={posts} />
              </Box>
              <Box>
                <Typography variant="h2">Popular</Typography>
                <PopularPosts posts={posts} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;