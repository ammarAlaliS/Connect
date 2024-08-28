import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Avatar, Card, Button } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/1920x1080' }}
          style={styles.coverImage}
        />
        <View style={styles.coverOverlay} />
        <View style={styles.profileContainer}>
          <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/150' }} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileDescription}>Software Engineer at Acme Inc.</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          I'm a software engineer with a passion for building innovative products. In my free time, I enjoy hiking,
          reading, and experimenting with new technologies.
        </Text>
      </View>

      {/* Navigation Links */}
      <View style={styles.navLinksContainer}>
        <TouchableOpacity style={styles.navLink}>
          <Text style={styles.navLinkText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text style={styles.navLinkText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text style={styles.navLinkText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text style={styles.navLinkText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Posts Section */}
      <View style={styles.postsContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="John Doe"
            subtitle="Posted 2 hours ago"
            left={(props) => <Avatar.Image {...props} size={40} source={{ uri: 'https://via.placeholder.com/150' }} />}
          />
          <Card.Content>
            <Text>Had a great time hiking in the mountains this weekend! The views were breathtaking.</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/800x450' }}
              style={styles.postImage}
            />
          </Card.Content>
          <Card.Actions>
            <Button icon="heart-outline">Like</Button>
            <Button icon="message-outline">Comment</Button>
            <Button icon="share-outline">Share</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="John Doe"
            subtitle="Posted 1 day ago"
            left={(props) => <Avatar.Image {...props} size={40} source={{ uri: 'https://via.placeholder.com/150' }} />}
          />
          <Card.Content>
            <Text>
              Excited to share that I just published a new blog post on my personal website. Check it out if you're
              interested in learning more about the latest trends in web development!
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button icon="heart-outline">Like</Button>
            <Button icon="message-outline">Comment</Button>
            <Button icon="share-outline">Share</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  coverContainer: {
    height: 300,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  profileContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  bioContainer: {
    padding: 16,
  },
  bioText: {
    fontSize: 16,
    color: '#666',
  },
  navLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  navLink: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  navLinkText: {
    fontSize: 16,
    color: '#333',
  },
  postsContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
});

export default ProfileScreen;
