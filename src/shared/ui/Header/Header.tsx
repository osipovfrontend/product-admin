import * as React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Box,
    Tooltip,
    Divider,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';
import {
    Logout as LogoutIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../../features/auth';

interface HeaderProps {
    title?: string;
}

export const Header = ({ title = 'Администрирование товаров' }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
    };

    const handleProfile = () => {
        handleClose();
        alert('Страница профиля в разработке');
    };

    const getInitials = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName[0]}${user.lastName[0]}`;
        }
        if (user?.username) {
            return user.username[0].toUpperCase();
        }
        return 'U';
    };

    return (
        <Paper elevation={1} sx={{ marginTop: '20px' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 500,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Аккаунт">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'primary.main',
                                    cursor: 'pointer'
                                }}
                            >
                                {getInitials()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                mt: 1.5,
                                minWidth: 220,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {user?.firstName && user?.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user?.username || 'Пользователь'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {user?.email || 'email@example.com'}
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfile}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Профиль</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Выйти из учетной записи</ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </Paper>
    );
}