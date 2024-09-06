import React from 'react';
import CardName from '../CardName/CardName';
import CardText from '../CardText/CardText';

type Props = {
    name: string;
    text?: string;
}
const CardHeader: React.FC<Props> = ({ name, text }) => (
  <>
    <CardName>{name}</CardName>
    {text ? <CardText>{text}</CardText> : null}
  </>
);

export default CardHeader;
