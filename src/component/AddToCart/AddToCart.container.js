import { connect } from 'react-redux';

import {
    AddToCartContainer as SourceAddToCartContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/AddToCart/AddToCart.container';
import { getPrice } from 'Util/Product/Extract';

/** @namespace ScandiTest/Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace ScandiTest/Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace ScandiTest/Component/AddToCart/Container */
export class AddToCartContainer extends SourceAddToCartContainer {
    isDisabled() {
        const { quantity, product } = this.props;
        const {
            price_range,
            dynamic_price,
            type_id
        } = product;

        const price = getPrice(price_range, dynamic_price, {}, type_id).price.finalPrice.value;
        // eslint-disable-next-line no-magic-numbers
        if (price * quantity > 300) {
            return true;
        }

        return false;
    }

    containerProps() {
        const {
            isDisabled,
            isIconEnabled,
            mix,
            layout
        } = this.props;

        const {
            isAdding
        } = this.state;

        return {
            isDisabled: isDisabled || this.isDisabled(),
            isIconEnabled,
            mix,
            layout,
            isAdding
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
