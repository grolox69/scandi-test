import { connect } from 'react-redux';

import {
    AddToCartContainer as SourceAddToCartContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/AddToCart/AddToCart.container';
import { getAllCartItemsSku } from 'Util/Cart';
import { getPrice } from 'Util/Product/Extract';

/** @namespace ScandiTest/Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    cart_items: state.CartReducer.cartTotals.items
});

/** @namespace ScandiTest/Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace ScandiTest/Component/AddToCart/Container */
export class AddToCartContainer extends SourceAddToCartContainer {
    globalValidationMap = [
        this.validateStock.bind(this),
        this.validateQuantity.bind(this),
        this.validateCustomizable.bind(this),
        this.validateByType.bind(this),
        this.validateItemGender.bind(this)
    ];

    validateItemGender() {
        const { cart_items, product } = this.props;
        if (cart_items.length === 0) {
            return true;
        }

        const product_sku = product.sku[0] === 'n' ? 'M' : 'F';
        const skus = getAllCartItemsSku(cart_items).map((sku) => {
            if (sku.sku[0] === 'n') {
                return 'M';
            }

            return 'F';
        });

        if (!skus.includes(product_sku)) {
            // eslint-disable-next-line no-alert
            alert('Careful, you are adding an item from different gender. Do you wish to continue?');
        }

        return true;
    }

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
