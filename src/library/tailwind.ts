import { create, TailwindFn } from 'tailwind-react-native-classnames';
import styles from '../../tw-rn-styles.json';

const customTailwind:TailwindFn = create(styles);
export default customTailwind;