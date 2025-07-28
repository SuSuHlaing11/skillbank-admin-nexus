
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Flag, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const mockPosts = [
  {
    id: 1,
    title: 'Need help with community garden project',
    author: 'Green Community Org',
    category: 'Environment',
    status: 'active',
    reports: 0,
    views: 234,
    createdAt: '2024-01-15',
    description: 'Looking for volunteers to help establish a community garden in downtown area...'
  },
  {
    id: 2,
    title: 'Teaching assistance for underprivileged children',
    author: 'Education First',
    category: 'Education',
    status: 'pending',
    reports: 1,
    views: 156,
    createdAt: '2024-01-14',
    description: 'We need qualified teachers to provide tutoring services...'
  },
  {
    id: 3,
    title: 'Suspicious fundraising request',
    author: 'Unknown User',
    category: 'Finance',
    status: 'flagged',
    reports: 5,
    views: 89,
    createdAt: '2024-01-13',
    description: 'Urgent need for funds with no clear explanation...'
  },
];

export const PostManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Post Management</h1>
          <p className="text-gray-600 mt-2">Review and moderate all posts on the platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">342</div>
            <p className="text-sm text-gray-600">Active Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">28</div>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">15</div>
            <p className="text-sm text-gray-600">Flagged Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">89</div>
            <p className="text-sm text-gray-600">Total Reports</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Posts</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)} variant="secondary">
                        {post.status}
                      </Badge>
                      {post.reports > 0 && (
                        <Badge variant="destructive" className="bg-red-500">
                          {post.reports} reports
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>By: {post.author}</span>
                      <span>Category: {post.category}</span>
                      <span>Views: {post.views}</span>
                      <span>Created: {post.createdAt}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/posts/${post.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Flag Content
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
