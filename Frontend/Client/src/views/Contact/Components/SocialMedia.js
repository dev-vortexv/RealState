import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

const SocialMedia = ({ data }) => {
  const socialMediaProfiles = [
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon style={{ fontSize: 40, color: '#673ab7' }} />,
      url: data.linkedInProfile
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon style={{ fontSize: 40, color: '#673ab7' }} />,
      url: data.facebookProfile
    },
    { name: 'Twitter', icon: <TwitterIcon style={{ fontSize: 40, color: '#673ab7' }} />, url: data.twitterHandle },
    { name: 'other links', icon: <LinkIcon style={{ fontSize: 40, color: '#673ab7' }} />, url: data.otherProfiles }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Item>
          <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center' }}>
            Social Media Profiles
          </Typography>
          <hr />

          <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}>
            {socialMediaProfiles.map((profile, index) => (
              <Grid item key={index} xs={6} md={1}>
                <a href={profile.url} target="_blank" rel="noopener noreferrer">
                  {profile.icon}
                </a>
                <Typography variant="h5">{profile.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default SocialMedia;
