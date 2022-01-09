import ImageProps from './ImageProps'
export default interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
