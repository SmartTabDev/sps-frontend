import React, { useCallback } from 'react';
import { Stack, styled } from '@mui/system';
import {
  CampaignOutlined,
  CampaignSharp,
  EmojiEventsOutlined,
  EmojiEventsSharp,
  GavelOutlined,
  GavelSharp,
  LocalOfferOutlined,
  LocalOfferSharp,
  LocalShippingOutlined,
  LocalShippingSharp,
} from '@mui/icons-material';
import BadgesContext from './BadgesContext';
import BadgeWrapper, { BadgeWrapperProps } from './BadgeWrapper';

const StyledBadgesWrapper = styled(Stack)`
  margin-top: 8px;
`;

type CustomBadgeProps = Pick<
  BadgeWrapperProps,
  'isActive' | 'handleClick' | 'tooltipTitle'
>;

const SponsoredBadge: React.FC<CustomBadgeProps> = ({
  isActive,
  handleClick,
  tooltipTitle,
}) => (
  <BadgeWrapper
    isActive={isActive}
    activeIcon={CampaignSharp}
    inactiveIcon={CampaignOutlined}
    handleClick={handleClick}
    tooltipTitle={tooltipTitle}
  />
);

const TrophyBadge: React.FC<CustomBadgeProps> = ({
  isActive,
  handleClick,
  tooltipTitle,
}) => (
  <BadgeWrapper
    isActive={isActive}
    activeIcon={EmojiEventsSharp}
    inactiveIcon={EmojiEventsOutlined}
    handleClick={handleClick}
    tooltipTitle={tooltipTitle}
  />
);

const PromotionBadge: React.FC<CustomBadgeProps> = ({
  isActive,
  handleClick,
  tooltipTitle,
}) => (
  <BadgeWrapper
    isActive={isActive}
    activeIcon={LocalOfferSharp}
    inactiveIcon={LocalOfferOutlined}
    handleClick={handleClick}
    tooltipTitle={tooltipTitle}
  />
);

const BiddingBadge: React.FC<CustomBadgeProps> = ({
  isActive,
  handleClick,
  tooltipTitle,
}) => (
  <BadgeWrapper
    isActive={isActive}
    activeIcon={GavelSharp}
    inactiveIcon={GavelOutlined}
    handleClick={handleClick}
    tooltipTitle={tooltipTitle}
  />
);

const FreeShippingBadge: React.FC<CustomBadgeProps> = ({
  isActive,
  handleClick,
  tooltipTitle,
}) => (
  <BadgeWrapper
    isActive={isActive}
    activeIcon={LocalShippingSharp}
    inactiveIcon={LocalShippingOutlined}
    handleClick={handleClick}
    tooltipTitle={tooltipTitle}
  />
);

export type Badges = {
  trophy?: boolean;
  isSponsored?: boolean;
  isPromotion?: boolean;
  bidding?: boolean;
  freeShipping?: boolean;
};

export type BadgesProps = Partial<
  Badges & {
    handleClick: (value: { [K in keyof Badges]: boolean }) => void;
    size: number;
    hideTrophy?: boolean;
    hideIsSponsored?: boolean;
    hideIsPromotion?: boolean;
    hideBidding?: boolean;
    hideFreeShipping?: boolean;
    showAll?: boolean;
    trophyTooltipTitle?: string;
    isSponsoredTooltipTitle?: string;
    isPromotionTooltipTitle?: string;
    biddingTooltipTitle?: string;
    freeShippingTooltipTitle?: string;
  }
>;

export const Badges: React.FC<BadgesProps> = ({
  handleClick,
  size = 18,
  trophyTooltipTitle,
  isSponsoredTooltipTitle,
  isPromotionTooltipTitle,
  biddingTooltipTitle,
  freeShippingTooltipTitle,
  hideTrophy = false,
  hideIsSponsored = false,
  hideIsPromotion = false,
  hideBidding = false,
  hideFreeShipping = false,
  showAll = false,
  ...badges
}) => {
  const { trophy, isPromotion, bidding, freeShipping, isSponsored } = badges;

  const handleBadgeClick = useCallback(
    (value) => {
      if (handleClick) {
        handleClick(value);
      }
    },
    [handleClick]
  );

  return (
    <BadgesContext.Provider
      value={{
        size,
        asButton: !!handleClick,
        colors: {
          primary: '#447EEB',
          outline: '#525F81',
        },
      }}
    >
      <StyledBadgesWrapper direction="row" spacing={3}>
        {(trophy || showAll) && !hideTrophy ? (
          <TrophyBadge
            tooltipTitle={trophyTooltipTitle}
            isActive={trophy}
            handleClick={() => handleBadgeClick({ ...badges, trophy: !trophy })}
          />
        ) : null}
        {(isSponsored || showAll) && !hideIsSponsored ? (
          <SponsoredBadge
            tooltipTitle={isSponsoredTooltipTitle}
            isActive={isSponsored}
            handleClick={() =>
              handleBadgeClick({ ...badges, isSponsored: !isSponsored })
            }
          />
        ) : null}
        {(isPromotion || showAll) && !hideIsPromotion ? (
          <PromotionBadge
            tooltipTitle={isPromotionTooltipTitle}
            isActive={isPromotion}
            handleClick={() =>
              handleBadgeClick({ ...badges, isPromotion: !isPromotion })
            }
          />
        ) : null}
        {(freeShipping || showAll) && !hideFreeShipping ? (
          <FreeShippingBadge
            tooltipTitle={freeShippingTooltipTitle}
            isActive={freeShipping}
            handleClick={() =>
              handleBadgeClick({ ...badges, freeShipping: !freeShipping })
            }
          />
        ) : null}
        {(bidding || showAll) && !hideBidding ? (
          <BiddingBadge
            tooltipTitle={biddingTooltipTitle}
            isActive={bidding}
            handleClick={() =>
              handleBadgeClick({ ...badges, bidding: !bidding })
            }
          />
        ) : null}
      </StyledBadgesWrapper>
    </BadgesContext.Provider>
  );
};
