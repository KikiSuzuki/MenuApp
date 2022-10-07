export const formatUser = (user) => (user ? `${user?.lastname} ${user?.firstname} ${user?.middlename || ''}` : '');
