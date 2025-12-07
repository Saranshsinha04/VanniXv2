import React from 'react';

export const ProfileCard = ({ username = 'Guest Player', avatar = 'A' }) => {
  return (
    <div className="absolute top-8 right-8 md:top-8 md:right-8 sm:top-6 sm:right-6 flex items-center gap-3 px-5 py-3 bg-dark-surface bg-opacity-60 border border-brand-cyan border-opacity-20 rounded-full backdrop-blur-lg hover:border-opacity-40 transition-all duration-300 animate-slide-in-right">
      {/* Profile Avatar */}
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-brand-cyan to-brand-cyan-dark flex items-center justify-center font-bold text-sm md:text-base text-dark-bg flex-shrink-0">
        {avatar}
      </div>

      {/* Username */}
      <span className="text-xs md:text-sm text-dark-text font-medium whitespace-nowrap">
        {username}
      </span>
    </div>
  );
};

export default ProfileCard;