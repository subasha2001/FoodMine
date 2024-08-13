import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constant/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constant/order_status";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post('/create',
    asyncHandler(
        //getting the order to save from the body into the db
        async (req: any, res: any) => {
            const requestOrder = req.body;
            if (requestOrder.items.length <= 0) {
                res.status(HTTP_BAD_REQUEST).send('Cart is empty');
                return
            }

            await OrderModel.deleteOne({
                user: req.user.id,          //present due to auth.mid.ts
                status: OrderStatus.NEW
            });     //deletes the last order every time I want to create a new order

            const newOrder = new OrderModel({...requestOrder, user: req.user.id})
            // ... - spread operator
            //adds user with id to requestOrder
            await newOrder.save();
            res.send(newOrder);
        }
    )
)

router.get('/newOrderForCurrentUser', asyncHandler(
    async (req:any, res)=>{
        const order = await getNewOrderForCurrentUser(req);
        if(order) res.send(order);
        else res.status(HTTP_BAD_REQUEST).send();
    }
))

router.post('/pay', asyncHandler(async(req:any, res)=>{
    const {paymentId} = req.body.paymentId;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('track/:id', asyncHandler(async(req, res)=>{
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))
export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
