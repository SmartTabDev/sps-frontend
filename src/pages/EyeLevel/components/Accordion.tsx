import React, {
  useCallback,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import LinearLoader from 'components/LinearLoader';
import {
  getColorProgressBar,
  colorCodingData,
} from 'utils/colors/getColorProgressBar';
import { useTimeoutFn } from 'react-use';
import { ProgressBar } from './Charts/ProgressBar';
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledSpan,
} from '../style';
import { EyeLevelRetailerData } from '../types';

type Props = {
  title: () => ReactNode;
  children: ReactNode | ((expanded: boolean) => ReactNode);
};

export const Accordion: React.FC<Props> = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <StyledAccordion
      disableGutters
      elevation={0}
      square
      expanded={expanded}
      onChange={() => handleChange()}
    >
      <StyledAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        {title ? title() : ''}
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Stack direction="row">
          <Box sx={{ minWidth: 33 }} />
          <Box sx={{ flex: 1, display: 'block' }}>
            {typeof children === 'function'
              ? (children as (obj: boolean) => ReactNode)(expanded)
              : children}
          </Box>
        </Stack>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

type AccordionRowProps = {
  name: string;
  data: EyeLevelRetailerData;
  isLoading?: boolean;
};

type AccordionBodyProps = {
  exanded: boolean;
  data: EyeLevelRetailerData;
};

const AccordionBody: React.FC<AccordionBodyProps> = ({ exanded, data }) => {
  const progresBars: {
    [key: string]: {
      name: string;
      value: number;
      change: number;
    }[];
  } = useMemo(
    () => ({
      shelf: [
        {
          name: 'AVAILABLE',
          value: data.shelf.available.percent,
          change: data.shelf.available.change,
        },
        {
          name: 'LISTED',
          value: data.shelf.listed.percent,
          change: data.shelf.listed.change,
        },
        {
          name: 'OUT OF STOCK',
          value: data.shelf.outOfStock.percent,
          change: data.shelf.outOfStock.change,
        },
      ],
      content: [
        {
          name: 'P-SHOT MATCH',
          value: data.content.pShotMatch.percent,
          change: data.content.pShotMatch.change,
        },
        {
          name: '# IMAGES',
          value: data.content.images.percent,
          change: data.content.images.change,
        },
        {
          name: 'BULLETS',
          value: data.content.bullets.percent,
          change: data.content.bullets.change,
        },
        {
          name: 'RICH CONTENT',
          value: data.content.richContent.percent,
          change: data.content.richContent.change,
        },
      ],
      'ratings & reviews': [
        {
          name: 'R&R',
          value: data.ratingAndReviews.rAndR.percent,
          change: data.ratingAndReviews.rAndR.change,
        },
        {
          name: 'RATING',
          value: data.ratingAndReviews.rating.percent,
          change: data.ratingAndReviews.rating.change,
        },
        {
          name: '# REVIEWS',
          value: data.ratingAndReviews.reviews.percent,
          change: data.ratingAndReviews.reviews.change,
        },
      ],
      search: [
        {
          name: 'SHARE/FAIR SHARE',
          value: data.search.searchVsFairShare.percent,
          change: data.search.searchVsFairShare.change,
        },
      ],
    }),
    [data]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [, , resetTimeOutLoadData] = useTimeoutFn(
    () => setIsLoading(false),
    2000
  );

  useEffect(() => {
    setIsLoading(true);
    resetTimeOutLoadData();
  }, [exanded, resetTimeOutLoadData]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: '260px' }}
      >
        <LinearLoader width={300} text="Loading data..." />
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing="48px" alignItems="stretch">
      <StyledSpan />
      <Box sx={{ flex: 1, minWidth: 124 }} />
      {Object.keys(progresBars).map((key) => {
        return (
          <Box
            sx={{
              flex: 1,
              display: 'block',
              '>div': { minHeight: 52 },
              minWidth: 124,
            }}
            key={`Accordion#${Math.random()}`}
          >
            {progresBars?.[key]?.map((p) => {
              return (
                <ProgressBar
                  key={p.name}
                  name={p.name}
                  value={p.value}
                  change={p.change}
                  color={getColorProgressBar(key, p.name, p.value)}
                />
              );
            })}
          </Box>
        );
      })}
    </Stack>
  );
};

export const AccordionRow: React.FC<AccordionRowProps> = ({
  name,
  data,
  isLoading,
}) => {
  const headers = useMemo(
    () => [
      {
        key: 'general',
        value: data.general.avg.percent,
        change: data.general.avg.change,
      },
      {
        key: 'shelf',
        name: 'Available',
        value: data.shelf.avg.percent,
        change: data.shelf.avg.change,
      },
      {
        key: 'content',
        value: data.content.avg.percent,
        change: data.content.avg.change,
      },
      {
        key: 'ratings & reviews',
        name: 'R&R',
        value: data.ratingAndReviews.avg.percent,
        change: data.ratingAndReviews.avg.change,
      },
      {
        key: 'search',
        name: 'Share/Fair Share',
        value: data.search.avg.percent,
        change: data.search.avg.change,
      },
    ],
    [data]
  );

  const getHeaderColor = (value: number, key: string) => {
    const columnColorCodingData = colorCodingData.find(
      ({ title }) => title === key
    ) || { data: [] };
    const colorCoding = columnColorCodingData.data[0];

    if (!colorCoding) {
      return undefined;
    }
    if (value > colorCoding.success) {
      return 'success';
    }
    if (value > colorCoding.warning) {
      return 'warning';
    }
    return 'error';
  };

  return (
    <Accordion
      title={() => (
        <Stack
          direction="row"
          spacing="48px"
          alignItems="center"
          sx={{
            flex: 1,
            '>div': {
              minWidth: 124,
            },
          }}
        >
          <StyledSpan>{name}</StyledSpan>
          {headers.map((dt) => (
            <React.Fragment key={`ProgressBar#${Math.random()}`}>
              {isLoading && (
                <Box
                  sx={{
                    height: 45,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" height={16} />
                </Box>
              )}
              {!isLoading && (
                <ProgressBar
                  name={dt.name || 'AVG'}
                  value={dt.value}
                  change={dt.change}
                  color={getHeaderColor(dt.value, dt.key)}
                />
              )}
            </React.Fragment>
          ))}
        </Stack>
      )}
    >
      {(exanded) =>
        !exanded ? null : <AccordionBody data={data} exanded={exanded} />
      }
    </Accordion>
  );
};
