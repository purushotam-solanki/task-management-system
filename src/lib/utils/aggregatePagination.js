/**Wrapper function over mongoose-aggregate-pagination-v2 */
const aggregatePagination = async (Model, aggregationPipeline = [], paginationOptions = {}) => {
    try {
        paginationOptions.limit = !paginationOptions.limit ? 10 : paginationOptions.limit
        paginationOptions.page = !paginationOptions.page ? 1 : paginationOptions.page
        const dataWithPagination = await Model.aggregatePaginate(Model.aggregate(aggregationPipeline).collation({ locale: 'en' }), paginationOptions)
        return dataWithPagination
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = aggregatePagination