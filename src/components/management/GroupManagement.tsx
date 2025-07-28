
import React from 'react';
import { Users, MoreHorizontal, Eye, Settings, UserPlus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const mockGroups = [
  {
    id: 1,
    name: 'Tech Volunteers',
    description: 'Technology professionals helping non-profits with digital solutions',
    members: 45,
    type: 'volunteer',
    status: 'active',
    leader: 'Sarah Johnson',
    created: '2023-12-01',
    projects: 12
  },
  {
    id: 2,
    name: 'Local Businesses Alliance',
    description: 'Business owners collaborating on community development projects',
    members: 23,
    type: 'organization',
    status: 'active',
    leader: 'Mike Chen',
    created: '2024-01-15',
    projects: 8
  },
  {
    id: 3,
    name: 'Healthcare Heroes',
    description: 'Medical professionals volunteering for community health initiatives',
    members: 67,
    type: 'volunteer',
    status: 'active',
    leader: 'Dr. Emily Davis',
    created: '2023-11-20',
    projects: 15
  },
];

export const GroupManagement = () => {
  const navigate = useNavigate();
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'volunteer': return 'bg-blue-100 text-blue-800';
      case 'organization': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Group Management</h1>
          <p className="text-gray-600 mt-2">Manage volunteer groups and organizations</p>
        </div>
        <Button>Create New Group</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">18</div>
            <p className="text-sm text-gray-600">Total Groups</p>
            <p className="text-xs text-gray-500 mt-1">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">234</div>
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-xs text-gray-500 mt-1">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">45</div>
            <p className="text-sm text-gray-600">Active Projects</p>
            <p className="text-xs text-gray-500 mt-1">+7 this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Badge className={getTypeColor(group.type)} variant="secondary">
                      {group.type}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/groups/${group.id}`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Group
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Members</span>
                  <span className="font-medium text-gray-900">{group.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Projects</span>
                  <span className="font-medium text-gray-900">{group.projects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Leader</span>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {group.leader.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{group.leader}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900">{group.created}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
