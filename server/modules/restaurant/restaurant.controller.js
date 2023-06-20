const RestaurantService = require('./restaurant.service');

exports.getRestaurantInforById = async (req, res) => {
    try {
        let {restaurantId}=req.params
        let restaurantInfor = await RestaurantService.getRestaurantInforById(restaurantId);

        res.status(200).json({
            success: true,
            messages: 'Get restaurant info',
            content: restaurantInfor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.getMenu = async (req, res) => {
    try {
        let {restaurantId}=req.params
        let listMenu = await RestaurantService.getMenu(restaurantId);

        res.status(200).json({
            success: true,
            messages: 'Get menu success',
            content: listMenu
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.editRestaurantInfor = async (req, res) => {
    try {
        let {restaurantId} = req.params
        let data = req.body
        data.restaurantId = restaurantId
        await RestaurantService.editRestaurantInfor(data);

        res.status(200).json({
            success: true,
            messages: 'edit success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}