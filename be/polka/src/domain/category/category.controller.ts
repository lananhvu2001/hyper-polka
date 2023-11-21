import {internalError} from "../../utils/controllerUtils";
import * as CategoryBL from "./category.service";
import {AuthRequest} from "../../constants/types";
import {Types} from "mongoose";
import {requireUser} from "../../middlewares/protected-route";
import {ServerResponse} from "http";
import polka from 'polka';
const router = polka();

router.get('/:id', async (req: AuthRequest , res: ServerResponse) => {
   try {
      const resp = await CategoryBL.getCategories(new Types.ObjectId(req.params.id))
      res.end(JSON.stringify(resp))
   } catch (e) {
      internalError(e, res)
   }
})
router
    .use(requireUser)
    .post('/', async (req: AuthRequest, res: ServerResponse) => {
   try {
      const {name, tags} = req.body
      const resp = await CategoryBL.create(req.user._id, {name, tags})
      res.end(JSON.stringify(resp))
   } catch (e) {
      internalError(e, res)
   }
})
router.put('/:id', requireUser, async (req: AuthRequest, res: ServerResponse) => {
   try {
      const resp = await CategoryBL.update(req.user._id, new Types.ObjectId(req.params.id), req.body)
      res.end(JSON.stringify(resp))
   } catch (e) {
      internalError(e, res)
   }
})
router.delete('/:id', requireUser, async (req: AuthRequest, res: ServerResponse) => {
   try {
      const resp = await CategoryBL.remove(req.user._id, new Types.ObjectId(req.params.id) )
      res.end(JSON.stringify(resp))
   } catch (e) {
      internalError(e, res)
   }
})

export default router
