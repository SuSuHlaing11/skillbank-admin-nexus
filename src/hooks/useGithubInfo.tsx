import { useState, useEffect } from 'react';

interface GitHubInfo {
  lastCommit: string;
  lastUpdate: string;
  commitMessage: string;
  author: string;
  loading: boolean;
  error: string | null;
}

export const useGithubInfo = (repoUrl: string = 'https://api.github.com/repos/octocat/Hello-World') => {
  const [githubInfo, setGithubInfo] = useState<GitHubInfo>({
    lastCommit: '',
    lastUpdate: '',
    commitMessage: '',
    author: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGithubInfo = async () => {
      try {
        setGithubInfo(prev => ({ ...prev, loading: true, error: null }));
        
        // Mock GitHub API response for demo purposes
        // In production, you'd use actual GitHub API
        const mockResponse = {
          sha: 'a1b2c3d',
          commit: {
            message: 'Update admin dashboard with new features',
            author: {
              name: 'VSB Developer',
              date: new Date().toISOString()
            }
          }
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setGithubInfo({
          lastCommit: mockResponse.sha.substring(0, 7),
          lastUpdate: new Date(mockResponse.commit.author.date).toLocaleDateString(),
          commitMessage: mockResponse.commit.message,
          author: mockResponse.commit.author.name,
          loading: false,
          error: null
        });
      } catch (error) {
        setGithubInfo(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch GitHub information'
        }));
      }
    };

    fetchGithubInfo();
  }, [repoUrl]);

  return githubInfo;
};