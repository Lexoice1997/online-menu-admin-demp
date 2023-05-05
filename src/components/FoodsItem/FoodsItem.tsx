import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { splitNum } from '../../helpers/utils/splitNum';
import { Food } from '../../types/Food';
import './FoodsItem.css';
import FoodsItemAction from './FoodsItemAction';

function FoodsItem({ id, name, description, price, avatar, admin, categoryId }: Food) {
  return (
    <div className="food">
      <LazyLoadImage
        alt={name}
        src={avatar}
        effect="blur"
        className="food-img"
        width="100%"
        height={130}
        style={{ padding: '10px' }}
      />
      <div className={admin ? 'food-info-admin' : 'food-info'}>
        <div>
          <div>
            <h2 className="food-name">{name}</h2>
            <p className="food-description">{description}</p>
          </div>

          <div>
            <p className="food-price">{splitNum(price)} сум</p>
          </div>
        </div>

        {admin && (
          <FoodsItemAction
            id={id}
            name={name}
            description={description}
            categoryId={categoryId}
            price={price}
          />
        )}
      </div>
    </div>
  );
}

export default FoodsItem;
