import React from 'react';
import IconButton from '@mui/material/IconButton';
import { PlayCircleOutline } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import MatchCell from './MatchCell';

interface VideoMatchCellProps {
  match: boolean;
  videoUrl?: string;
}

const VideoMatchCell = ({ match, videoUrl }: VideoMatchCellProps) => {
  const { palette } = useTheme();
  const openVideo = () => {
    window.open(videoUrl, '_blank');
  };

  if (match && videoUrl) {
    return (
      <IconButton onClick={openVideo}>
        <PlayCircleOutline
          sx={{ fontWeight: 400, color: palette.blueGrey[400] }}
        />
      </IconButton>
    );
  }

  return <MatchCell match={match} />;
};

export default VideoMatchCell;
