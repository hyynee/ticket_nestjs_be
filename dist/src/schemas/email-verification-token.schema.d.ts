import { Document } from 'mongoose';
import { User } from './user.schema';
export declare class EmailVerificationToken extends Document {
    userId: User;
    token: string;
    expiresAt: Date;
}
export declare const EmailVerificationTokenSchema: import("mongoose").Schema<EmailVerificationToken, import("mongoose").Model<EmailVerificationToken, any, any, any, Document<unknown, any, EmailVerificationToken, any, {}> & EmailVerificationToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailVerificationToken, Document<unknown, {}, import("mongoose").FlatRecord<EmailVerificationToken>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EmailVerificationToken> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
