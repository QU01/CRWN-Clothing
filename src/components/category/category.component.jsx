import React from 'react';

import CollectionItem from '../../components/collection/collection-item.component';

import {selectCollection} from '../../redux/shop/shop.reducer';
import './category.styles.scss'


const CollectionPage = ({match}) => {
    const {title, items} = collection
    
    return(
        <div className='collection-page'>
            <h2>Collection page</h2>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) = ({

    collection = selectCollection(ownProps.match.params.collectionId)(state)
})