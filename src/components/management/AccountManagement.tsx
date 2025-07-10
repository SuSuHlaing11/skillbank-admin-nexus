
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Ban, AlertTriangle, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    type: 'volunteer',
    status: 'active',
    joinDate: '2024-01-15',
    posts: 12,
    warnings: 0
  },
  {
    id: 2,
    name: 'Community Foundation',
    email: 'contact@foundation.org',
    type: 'organization',
    status: 'active',
    joinDate: '2023-12-01',
    posts: 45,
    warnings: 1
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    type: 'requestor',
    status: 'banned',
    joinDate: '2024-02-20',
    posts: 3,
    warnings: 3
  },
];

export const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'banned': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'volunteer': return 'bg-blue-100 text-blue-800';
      case 'organization': return 'bg-purple-100 text-purple-800';
      case 'requestor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
          <p className="text-muted-foreground mt-2">Manage all user accounts and permissions</p>
        </div>
        <Button className="animate-button-hover">Add New User</Button>
      </div>

      <Card className="animate-card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 w-64 transition-all duration-300 focus:w-72"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-3 py-2 border rounded-lg text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="volunteer">Volunteers</option>
                <option value="organization">Organizations</option>
                <option value="requestor">Requestors</option>
              </select>
              <select 
                className="px-3 py-2 border rounded-lg text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Posts</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Warnings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`border-b border-border hover:bg-muted/50 transition-colors duration-200 animate-fade-in-up animate-stagger-${Math.min(index + 1, 4)}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(user.type)} variant="secondary">
                        {user.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)} variant="secondary">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{user.joinDate}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.posts}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${user.warnings > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {user.warnings}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="animate-button-hover">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Send Warning
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
