
import {z} from 'zod';


export const ProductSchema = z.object({
    name: z.string().min(5, "Minimum length should be 5 characters."),
    description: z.string().min(10, "Minimum length is 10 characters."),
    cost: z.coerce.number(),
    itemsInStock: z.coerce.number(),
    srp: z.coerce.number(),
    categoryId: z.coerce.number().gt(0, "Please select category."),
    supplierId: z.coerce.number().gt(0, "Please select supplier.")
})

export const SupplierSchema = z.object({
    name: z.string().min(5, "Minimum length should be 5 characters."),
    description: z.string().min(10, 'Minimum length is 10 characters.')
})