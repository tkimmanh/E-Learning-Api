// ** service
import { registerService } from "~/services/auth.service";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerService({ name, email, password });
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
