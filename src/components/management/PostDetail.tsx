import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Heart, MessageCircle, Share2, Calendar, User, Tag } from "lucide-react";

const mockPostDetails = {
  1: {
    id: 1,
    title: "Environmental Clean-up Drive",
    content: `Join us for a community-wide environmental clean-up initiative that aims to restore our local parks and waterways. This comprehensive project will involve multiple volunteer groups working together to make a lasting impact on our environment.

Our goals include:
• Removing litter and debris from designated areas
• Planting native species to restore natural habitats
• Educating community members about environmental conservation
• Creating sustainable practices for ongoing maintenance

This event is perfect for volunteers of all ages and experience levels. We'll provide all necessary equipment including gloves, trash bags, and planting tools. Light refreshments will be available throughout the day.

By participating in this clean-up drive, you'll not only help improve our local environment but also connect with like-minded community members who share your passion for making a difference.

We encourage participants to bring friends and family members to multiply our impact. Together, we can create cleaner, greener spaces that everyone can enjoy for years to come.`,
    author: "Sarah Johnson",
    category: "Environment",
    status: "published",
    views: 342,
    likes: 28,
    comments: 15,
    shares: 8,
    publishedAt: "2024-01-15",
    tags: ["Environment", "Community", "Volunteer", "Clean-up"]
  },
  2: {
    id: 2,
    title: "Skills Workshop Series",
    content: `We're excited to announce our new Skills Workshop Series designed to help volunteers develop valuable professional and personal skills while contributing to meaningful causes.

This month's workshops include:

**Digital Marketing for Non-Profits** (January 20th)
Learn how to create compelling social media campaigns, manage online presence, and engage with supporters effectively. Perfect for volunteers interested in communications and outreach.

**Project Management Fundamentals** (January 27th)
Discover essential project management tools and techniques that can be applied to volunteer initiatives and professional development. Gain practical experience managing real community projects.

**Financial Literacy for Community Leaders** (February 3rd)
Understand budgeting, fundraising, and financial planning for community organizations. Ideal for volunteers looking to take on leadership roles.

Each workshop combines theoretical knowledge with hands-on practice, ensuring participants leave with actionable skills they can immediately apply. All workshops are free for registered volunteers and include resource materials and certificates of completion.

Space is limited to ensure personalized attention, so early registration is recommended. These workshops represent our commitment to not just utilizing volunteer skills, but actively developing them.`,
    author: "Michael Chen",
    category: "Education",
    status: "published",
    views: 189,
    likes: 22,
    comments: 12,
    shares: 5,
    publishedAt: "2024-01-12",
    tags: ["Education", "Skills", "Workshop", "Professional Development"]
  }
};

export function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = mockPostDetails[parseInt(id || '0') as keyof typeof mockPostDetails];

  if (!post) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Post not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="container mx-auto p-6 animate-in fade-in-50 duration-500">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-accent/50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(post.status)}>
                {post.status}
              </Badge>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {post.views}
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </div>
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  {post.shares}
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mt-4">{post.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {post.category}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-semibold mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="hover:bg-accent transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="hover:scale-105 transition-transform">
            <Heart className="h-4 w-4 mr-2" />
            Like Post
          </Button>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <MessageCircle className="h-4 w-4 mr-2" />
            Add Comment
          </Button>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}