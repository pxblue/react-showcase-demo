import { AppBar, Hidden, Toolbar, Typography, IconButton, Tooltip, makeStyles, createStyles } from '@material-ui/core';
import { Email, Menu, Settings, InvertColors, SwapHoriz } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Spacer, UserMenu } from '@pxblue/react-components';
import clsx from 'clsx';
import { TOGGLE_DIR, TOGGLE_THEME, TOGGLE_DRAWER } from '../redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(4),
            cursor: 'pointer',
        },
        iconFlip: {
            transform: 'scaleX(-1)',
        },
    })
);

export const SharedAppBar: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const rtl = theme.direction === 'rtl';
    const classes = useStyles();

    return (
        <AppBar position={'sticky'} color={'primary'}>
            <Toolbar style={{ padding: `0 ${theme.spacing(2)}px` }}>
                <Hidden smUp>
                    <Menu
                        className={clsx({ [classes.iconFlip]: rtl }, classes.menuButton)}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_DRAWER });
                        }}
                    />
                </Hidden>
                <Typography variant={'h6'}>Showcase</Typography>
                <Spacer flex={1} />
                <Tooltip title={'Toggle Theme'} aria-label={'toggle the theme of the current showcase'}>
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_THEME });
                        }}
                    >
                        <InvertColors className={clsx({ [classes.iconFlip]: rtl })} />
                    </IconButton>
                </Tooltip>
                <Spacer width={theme.spacing(1)} flex={0} />
                <Tooltip title={'Toggle Direction'} aria-label={'toggle the app direction: ltr/rtl'}>
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_DIR });
                        }}
                    >
                        <SwapHoriz className={clsx({ [classes.iconFlip]: rtl })} />
                    </IconButton>
                </Tooltip>
                <Spacer width={theme.spacing(1)} flex={0} />
                <UserMenu
                    avatar={<Avatar>MS</Avatar>}
                    menuTitle={'Marshall Sutter'}
                    menuSubtitle={'msutter@acmesteel.com'}
                    menuGroups={[
                        {
                            items: [
                                {
                                    title: 'Log Out',
                                    icon: <SendIcon className={clsx({ [classes.iconFlip]: rtl })} />,
                                },
                                {
                                    title: 'Account Settings',
                                    icon: <Settings className={clsx({ [classes.iconFlip]: rtl })} />,
                                    divider: true,
                                },
                            ],
                        },
                        {
                            title: 'Contact Us',
                            items: [
                                {
                                    title: 'eatonhelp@eaton.com',
                                    icon: <SendIcon className={clsx({ [classes.iconFlip]: rtl })} />,
                                },
                                {
                                    title: '1-866-905-9988',
                                    icon: <Email className={clsx({ [classes.iconFlip]: rtl })} />,
                                },
                            ],
                        },
                    ]}
                />
            </Toolbar>
        </AppBar>
    );
};