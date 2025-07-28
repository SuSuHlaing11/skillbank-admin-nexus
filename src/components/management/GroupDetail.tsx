import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Calendar, MapPin, Mail, Phone, Star, Crown } from "lucide-react";

const mockGroupDetails = {
  1: {
    id: 1,
    name: "Environmental Heroes",
    description: "A dedicated group of volunteers focused on environmental conservation and sustainability initiatives. We organize regular clean-up drives, tree planting events, and educational workshops to promote environmental awareness in our community.",
    type: "Environmental",
    status: "active",
    memberCount: 25,
    location: "Downtown Community Center",
    establishedDate: "2023-06-15",
    nextMeeting: "2024-02-15",
    contact: "env.heroes@example.com",
    phone: "+1 (555) 123-4567",
    members: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Team Leader",
        email: "sarah.j@example.com",
        joinDate: "2023-06-15",
        avatar: "/placeholder.svg",
        skills: ["Project Management", "Environmental Science"],
        isLeader: true
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        role: "Co-Leader",
        email: "mike.r@example.com",
        joinDate: "2023-07-01",
        avatar: "/placeholder.svg",
        skills: ["Community Outreach", "Event Planning"],
        isLeader: true
      },
      {
        id: 3,
        name: "Emily Chen",
        role: "Member",
        email: "emily.c@example.com",
        joinDate: "2023-08-12",
        avatar: "/placeholder.svg",
        skills: ["Social Media", "Photography"]
      },
      {
        id: 4,
        name: "David Wilson",
        role: "Member",
        email: "david.w@example.com",
        joinDate: "2023-09-05",
        avatar: "/placeholder.svg",
        skills: ["Logistics", "Coordination"]
      },
      {
        id: 5,
        name: "Lisa Thompson",
        role: "Member",
        email: "lisa.t@example.com",
        joinDate: "2023-10-18",
        avatar: "/placeholder.svg",
        skills: ["Education", "Public Speaking"]
      },
      {
        id: 6,
        name: "Alex Kim",
        role: "Member",
        email: "alex.k@example.com",
        joinDate: "2023-11-22",
        avatar: "/placeholder.svg",
        skills: ["Data Analysis", "Research"]
      }
    ]
  },
  2: {
    id: 2,
    name: "Community Builders",
    description: "A vibrant group focused on strengthening community bonds through various social initiatives, neighborhood improvement projects, and cultural events that bring people together.",
    type: "Community",
    status: "active",
    memberCount: 18,
    location: "Westside Community Hall",
    establishedDate: "2023-04-20",
    nextMeeting: "2024-02-12",
    contact: "builders@example.com",
    phone: "+1 (555) 987-6543",
    members: [
      {
        id: 7,
        name: "Rachel Martinez",
        role: "Team Leader",
        email: "rachel.m@example.com",
        joinDate: "2023-04-20",
        avatar: "/placeholder.svg",
        skills: ["Community Engagement", "Leadership"],
        isLeader: true
      },
      {
        id: 8,
        name: "James Park",
        role: "Member",
        email: "james.p@example.com",
        joinDate: "2023-05-15",
        avatar: "/placeholder.svg",
        skills: ["Construction", "Carpentry"]
      },
      {
        id: 9,
        name: "Maria Garcia",
        role: "Member",
        email: "maria.g@example.com",
        joinDate: "2023-06-03",
        avatar: "/placeholder.svg",
        skills: ["Event Planning", "Fundraising"]
      }
    ]
  }
};

export function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const group = mockGroupDetails[parseInt(id || '0') as keyof typeof mockGroupDetails];

  if (!group) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Group not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Environmental": return "bg-green-100 text-green-800";
      case "Education": return "bg-blue-100 text-blue-800";
      case "Community": return "bg-purple-100 text-purple-800";
      case "Health": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          Back to Groups
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Group Overview */}
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <Badge className={getTypeColor(group.type)}>
                {group.type}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {group.status}
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold mt-4">{group.name}</CardTitle>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {group.memberCount} members
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {group.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Est. {new Date(group.establishedDate).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-foreground leading-relaxed mb-6">
              {group.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {group.contact}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {group.phone}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Next Meeting</h4>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {new Date(group.nextMeeting).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Members ({group.members.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {group.members.map((member, index) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-300 animate-in slide-in-from-left-10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{member.name}</h4>
                        {member.isLeader && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-1 justify-end mb-2">
                      {member.skills?.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="hover:scale-105 transition-transform">
            <Users className="h-4 w-4 mr-2" />
            Join Group
          </Button>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Mail className="h-4 w-4 mr-2" />
            Contact Group
          </Button>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Star className="h-4 w-4 mr-2" />
            Follow Updates
          </Button>
        </div>
      </div>
    </div>
  );
}