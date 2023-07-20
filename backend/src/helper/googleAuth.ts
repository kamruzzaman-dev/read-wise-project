// const googleAuth = async (
//   tokenId: string
// ): Promise<IUserLoginResponse | void> => {

//   let userExists = null
//   let accessToken = null
//   let refreshToken = null
//   cilent
//     .verifyIdToken({
//       idToken: tokenId,
//       audience:
//         '733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com',
//     })
//     .then(async response => {
//       const payload = response.getPayload()
//       if (payload) {
//         const { name, email, email_verified, family_name } = payload
//         if (!email_verified) {
//           throw new ApiError(
//             httpStatus.NOT_FOUND,
//             'can not login! try different way.'
//           )
//         } else {
//           userExists = await User.findOne({ email: email })
//           if (!userExists) {
//             userExists = await User.create({
//               name: name,
//               email: email,
//               password: family_name + '@1234',
//               role: 'user',
//               phone: email,
//             })
//             if (userExists) {
//               accessToken = jwtHelpers.createToken(
//                 {
//                   id: userExists._id,
//                   role: userExists.role,
//                 },
//                 config.jwt.secret as Secret,
//                 config.jwt.expires_in as string
//               )

//               refreshToken = jwtHelpers.createToken(
//                 {
//                   id: userExists._id,
//                   role: userExists.role,
//                 },
//                 config.jwt.refresh_secret as Secret,
//                 config.jwt.refresh_expires_in as string
//               )
//               return {
//                 userData: userExists,
//                 accessToken,
//                 refreshToken,
//               }
//             } else {
//               throw new ApiError(
//                 httpStatus.NOT_FOUND,
//                 'can not login! try different way.'
//               )
//             }
//           } else {
//             accessToken = jwtHelpers.createToken(
//               {
//                 id: userExists._id,
//                 role: userExists.role,
//               },
//               config.jwt.secret as Secret,
//               config.jwt.expires_in as string
//             )
//             refreshToken = jwtHelpers.createToken(
//               {
//                 id: userExists._id,
//                 role: userExists.role,
//               },
//               config.jwt.refresh_secret as Secret,
//               config.jwt.refresh_expires_in as string
//             )
//             return {
//               userData: userExists,
//               accessToken,
//               refreshToken,
//             }
//           }
//         }
//       }
//     })
// }
