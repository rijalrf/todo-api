import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export const createToken = (email, userId) => {
  const ACCESS_EXP = "15m";
  const REFRESH_EXP = "7d";

  const accessToken = jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    {
      expiresIn: ACCESS_EXP,
      issuer: "api.todo",
      audience: "web",
    }
  );
  const jti = randomUUID();
  const refreshToken = jwt.sign(
    {
      userId,
      email,
      jti,
    },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    {
      expiresIn: REFRESH_EXP,
      issuer: "api.todo",
      audience: "web",
    }
  );
  const accessExp = jwt.decode(accessToken).exp;
  const refreshExp = jwt.decode(refreshToken).exp;

  return {
    accessToken,
    accessExp,
    refreshToken,
    refreshExp,
    jti,
  };
};

export const verifAccessToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

  return decoded;
};
export const verifRefreshToken = (planToken) => {
  const refreshToken = jwt.verify(
    planToken,
    process.env.JWT_SECRET_REFRESH_TOKEN
  );
  return refreshToken;
};

export const decodeToken = (planToken) => {
  const decode = jwt.decode(planToken);
  return decode;
};
