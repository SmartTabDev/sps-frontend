import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableHeaderCell } from 'components/TableCell/TableCell';
import OrderButton from 'components/OrderButton';
import { OrderType } from 'components/Table/DetailsTableRow';
import TableBody from '@mui/material/TableBody';
import ModalGallery from 'components/ModalGallery/ModalGallery';
import MatchCell from './components/MatchCell';
import { RetailerImagesRatingSummary } from './types';
import VideoMatchCell from './components/VideoMatchCell';
import {
  StyledLoadableTableCell,
  StyledTableCell,
  StyledTableRow,
} from './styles';
import ReferenceImages from '../RefrenceImages/ReferenceImages';

const VISIBLE_IMAGES_LIMIT = 7;

interface ImagesTableProps {
  orderType: OrderType;
  handleOrderChange: (isActive: boolean, key: string, type: OrderType) => void;
  retailerImagesRatingSummaries: RetailerImagesRatingSummary[];
  isLoading?: boolean;
}

interface DataRowProps {
  data: RetailerImagesRatingSummary;
  onImageClick: (cellImages: string[], imageIndex: number) => void;
  isLoading?: boolean;
}

const DataRow = ({
  data: {
    packshotMatch,
    otherImagesUrls,
    packshotUrl,
    retailer,
    totalImages,
    videoMatch,
    videoUrl,
  },
  onImageClick,
  isLoading,
}: DataRowProps) => {
  return (
    <StyledTableRow>
      <StyledLoadableTableCell
        sx={isLoading ? { paddingY: '33px' } : {}}
        loading={isLoading}
      >
        {retailer}
      </StyledLoadableTableCell>
      <StyledLoadableTableCell align="center" loading={isLoading}>
        {totalImages}
      </StyledLoadableTableCell>
      <StyledLoadableTableCell
        skeletonSize={{ minWidth: 60 }}
        align="center"
        loading={isLoading}
      >
        <ReferenceImages
          center
          limit={1}
          imageUrls={[packshotUrl as string]}
          onImageClick={(imageIndex) =>
            onImageClick([packshotUrl as string], imageIndex)
          }
        />
      </StyledLoadableTableCell>
      <StyledLoadableTableCell align="center" loading={isLoading}>
        <MatchCell match={packshotMatch as boolean} />
      </StyledLoadableTableCell>
      <StyledLoadableTableCell
        skeletonSize={{ minWidth: '480px' }}
        align="left"
        loading={isLoading}
      >
        <ReferenceImages
          limit={VISIBLE_IMAGES_LIMIT}
          imageUrls={otherImagesUrls as string[]}
          onImageClick={(imageIndex) =>
            onImageClick(otherImagesUrls as string[], imageIndex)
          }
        />
      </StyledLoadableTableCell>
      <StyledLoadableTableCell align="center" loading={isLoading}>
        <VideoMatchCell match={videoMatch as boolean} videoUrl={videoUrl} />
      </StyledLoadableTableCell>
    </StyledTableRow>
  );
};

const ImagesTable = ({
  handleOrderChange,
  orderType,
  retailerImagesRatingSummaries,
  isLoading,
}: ImagesTableProps) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryImageIndex, setGalleryImageIndex] = useState<number>(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const showGallery = (images: string[], imageIndex: number) => {
    setGalleryImages(images);
    setGalleryImageIndex(imageIndex);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryImages([]);
    setGalleryImageIndex(0);
    setIsGalleryOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                <OrderButton
                  activeOrderKey="retailer"
                  orderKey="retailer"
                  orderType={orderType}
                  text="Retailer"
                  toggleOrder={handleOrderChange}
                />
              </TableHeaderCell>
              <TableHeaderCell>Total images</TableHeaderCell>
              <TableHeaderCell>Packshot</TableHeaderCell>
              <TableHeaderCell>Packshot match</TableHeaderCell>
              <TableHeaderCell $left>Other images</TableHeaderCell>
              <TableHeaderCell>Video</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {retailerImagesRatingSummaries.map((data) => (
              <DataRow
                key={data.index}
                data={data}
                onImageClick={showGallery}
                isLoading={isLoading}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalGallery
        imageUrls={galleryImages}
        initialSlideIndex={galleryImageIndex}
        onClose={closeGallery}
        open={isGalleryOpen}
      />
    </>
  );
};

export default ImagesTable;
