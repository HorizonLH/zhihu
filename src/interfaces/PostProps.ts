import ImageProps from './ImageProps'
import UserProps from './UserProps'
export default interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
