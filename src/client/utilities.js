/**
 * Check if address for the user has been set
 * @param  {Object}  address
 * @return {Boolean}
 */
export const isAddressSet = (address) => {
    return (address.source !== '' || address.destination !== '')
}
