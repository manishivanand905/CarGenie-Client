import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faShare,
  faHeart,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";
import { useForm } from "react-hook-form";
import { theme } from "../../../styles/theme";
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  CategorySection,
  CategoryTab,
  TrendingSection,
  CarouselContainer,
  CarouselButton,
  PostsContainer,
  PostCard,
  PostHeader,
  UserInfo,
  PostContent,
  EngagementStats,
  TagContainer,
  Tag,
  Button,
} from "./communityStyles";
import CreateCommunityModal from "../../../components/user/CommunityModal/communityModal";
import { trendingPosts, categories } from "../../../data/user/communityData";

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "Car Enthusiasts",
      description: "A community for car lovers",
      members: 1200,
      created: "2024-02-21",
    },
  ]);

  const { reset } = useForm();

  const nextSlide = () => {
    setCarouselIndex((prev) =>
      prev === Math.floor(trendingPosts.length / 3) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? Math.floor(trendingPosts.length / 3) : prev - 1
    );
  };

  const handleCreateCommunity = (data) => {
    const newCommunity = {
      id: Date.now(),
      ...data,
      members: 1,
      created: new Date().toLocaleDateString(),
    };
    setCommunities([...communities, newCommunity]);
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteCommunity = (communityId) => {
    if (window.confirm("Are you sure you want to delete this community?")) {
      setCommunities(
        communities.filter((community) => community.id !== communityId)
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          <HeroTitle>Connect. Discuss. Explore.</HeroTitle>
          <HeroSubtitle>
            Join the CarGenie community and share your automotive passion
          </HeroSubtitle>
        </HeroSection>

        {/* Create Community Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Button onClick={() => setIsModalOpen(true)} primary>
            Create Community
          </Button>
        </div>

        {/* Create Community Modal */}
        <CreateCommunityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateCommunity}
        />

        {/* Trending Section */}
        <TrendingSection>
          <h2>Trending Discussions</h2>
          <CarouselContainer>
            <CarouselButton onClick={prevSlide} position="left">
              <FontAwesomeIcon icon={faChevronLeft} />
            </CarouselButton>

            {/* Trending Posts Carousel */}
            {trendingPosts
              .slice(carouselIndex * 3, (carouselIndex + 1) * 3)
              .map((post) => (
                <PostCard key={post.id} trending>
                  <PostHeader>
                    <UserInfo>
                      <img src={post.authorAvatar} alt={post.author} />
                      <div>
                        <h4>{post.author}</h4>
                        <span>{post.timestamp}</span>
                      </div>
                    </UserInfo>
                  </PostHeader>
                  <PostContent>
                    <h3>{post.title}</h3>
                    <p>{post.preview}</p>
                  </PostContent>
                  <EngagementStats>
                    <span>
                      <FontAwesomeIcon icon={faHeart} /> {post.likes}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faComment} /> {post.comments}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faShare} /> {post.shares}
                    </span>
                  </EngagementStats>
                  <TagContainer>
                    {post.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </TagContainer>
                </PostCard>
              ))}

            <CarouselButton onClick={nextSlide} position="right">
              <FontAwesomeIcon icon={faChevronRight} />
            </CarouselButton>
          </CarouselContainer>
        </TrendingSection>

        {/* Categories Section */}
        <CategorySection>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategorySection>

        {/* Communities Section */}
        <section>
          <h2>Communities</h2>
          <PostsContainer>
            {communities.map((community) => (
              <PostCard key={community.id}>
                <PostHeader>
                  <UserInfo>
                    <div>
                      <h4>{community.name}</h4>
                      <span>Created: {community.created}</span>
                    </div>
                  </UserInfo>
                </PostHeader>
                <PostContent>
                  <p>{community.description}</p>
                  <p>Members: {community.members}</p>
                </PostContent>
                <Button onClick={() => handleDeleteCommunity(community.id)}>
                  Delete Community
                </Button>
              </PostCard>
            ))}
          </PostsContainer>
        </section>

        {/* Regular Posts Section */}
        <PostsContainer>
          {trendingPosts.map((post) => (
            <PostCard key={post.id}>
              <PostHeader>
                <UserInfo>
                  <img src={post.authorAvatar} alt={post.author} />
                  <div>
                    <h4>{post.author}</h4>
                    <span>{post.timestamp}</span>
                  </div>
                </UserInfo>
              </PostHeader>
              <PostContent>
                <h3>{post.title}</h3>
                <p>{post.preview}</p>
              </PostContent>
              <EngagementStats>
                <span>
                  <FontAwesomeIcon icon={faHeart} /> {post.likes}
                </span>
                <span>
                  <FontAwesomeIcon icon={faComment} /> {post.comments}
                </span>
                <span>
                  <FontAwesomeIcon icon={faShare} /> {post.shares}
                </span>
              </EngagementStats>
              <TagContainer>
                {post.tags.map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </TagContainer>
            </PostCard>
          ))}
        </PostsContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default CommunityPage;
