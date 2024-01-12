import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Box, ButtonBase } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SideNavItemProps {
    active?: boolean;
    disabled?: boolean;
    external?: boolean;
    icon?: ReactNode;
    path?: string;
    title: string;
    hasSubMenu?: boolean;
    isSubMenuOpen?: boolean;
    onClick?: () => void;
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
    active = false,
    disabled,
    external,
    icon,
    path,
    title,
    hasSubMenu = false,
    isSubMenuOpen = false,
    onClick
}) => {
    const linkProps = path
        ? external
            ? {
                component: 'a',
                href: path,
                target: '_blank'
            }
            : {
                component: NextLink,
                href: path
            }
        : {};

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
                onClick={onClick}
                {...linkProps}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'primary.main'
                            })
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white'
                        }),
                        ...(disabled && {
                            color: 'neutral.500'
                        })
                    }}
                >
                    {title}
                </Box>
                {hasSubMenu && (
                    <ArrowDropDownIcon
                        style={{
                            transform: isSubMenuOpen ? 'rotate(180deg)' : 'rotate(360deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                )}
            </ButtonBase>
        </li>
    );
};