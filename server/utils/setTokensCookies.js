const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  try {
    // Calculate expiration times in milliseconds
    const accessTokenMaxAge = Math.max(0, (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000);
    const refreshTokenMaxAge = Math.max(0, (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000);
    
    // Only set cookies if we have valid positive values
    if (accessTokenMaxAge > 0 && refreshTokenMaxAge > 0) {
      // Set Cookie for Access Token
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only in production
        maxAge: accessTokenMaxAge,
        // sameSite: 'strict', // Adjust according to your requirements
      });

      // Set Cookie for Refresh Token
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only in production
        maxAge: refreshTokenMaxAge,
        // sameSite: 'strict', // Adjust according to your requirements
      });
      
      // Set Cookie for is_auth
      res.cookie('is_auth', true, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Only in production
        maxAge: refreshTokenMaxAge,
        // sameSite: 'strict', // Adjust according to your requirements
      });
    } else {
      console.warn('Invalid token expiration values detected. Cookies not set.');
    }
  } catch (error) {
    console.error('Error setting cookies:', error);
  }
}

export default setTokensCookies