import Joi from "joi";

export const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        name: Joi.string().min(5).max(500).required(),
        password: Joi.string().min(5).max(1024).required(),
        customerId: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(user);
}