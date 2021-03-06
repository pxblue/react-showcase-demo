import { AppBar, IconButton, Tooltip, makeStyles, createStyles, useMediaQuery } from '@material-ui/core';
import { Email, Menu, Settings, InvertColors, SwapHoriz } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useCallback } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Spacer, UserMenu, DropdownToolbar } from '@pxblue/react-components';
import clsx from 'clsx';
import { TOGGLE_DIR, TOGGLE_THEME, TOGGLE_DRAWER } from '../redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() =>
    createStyles({
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
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [subtitle, setSubtitle] = useState('Language');

    const clickDropdownMenuItem = useCallback(
        (language: string): void => {
            setSubtitle(language);
        },
        [setSubtitle]
    );

    const getNavigationIcon = useCallback((): JSX.Element | undefined => {
        if (smUp) {
            return undefined;
        }
        return (
            <IconButton
                color={'inherit'}
                onClick={(): void => {
                    dispatch({ type: TOGGLE_DRAWER });
                }}
            >
                <Menu className={clsx({ [classes.iconFlip]: false })} />
            </IconButton>
        );
    }, [smUp, classes, dispatch]);

    const menuItems = [
        { title: 'English', onClick: (): void => clickDropdownMenuItem('English') },
        { title: 'Arabic', onClick: (): void => clickDropdownMenuItem('Arabic') },
        { title: 'French', onClick: (): void => clickDropdownMenuItem('French') },
    ];

    return (
        <AppBar position={'sticky'} color={'primary'}>
            <DropdownToolbar
                title={'Showcase'}
                subtitle={subtitle}
                menuGroups={[{ items: menuItems }]}
                navigationIcon={getNavigationIcon()}
                MenuProps={{
                    anchorOrigin: { horizontal: rtl ? 'right' : 'left', vertical: 'bottom' },
                    transformOrigin: { horizontal: rtl ? 'right' : 'left', vertical: 'top' },
                }}
            >
                <Spacer flex={1} />
                <Tooltip title={'Toggle Theme'} aria-label={'toggle the theme of the current showcase'}>
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_THEME });
                        }}
                    >
                        <InvertColors className={clsx({ [classes.iconFlip]: false })} />
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
                        <SwapHoriz className={clsx({ [classes.iconFlip]: false })} />
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
                                    icon: <Settings className={clsx({ [classes.iconFlip]: false })} />,
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
                                    icon: <Email className={clsx({ [classes.iconFlip]: false })} />,
                                },
                            ],
                        },
                    ]}
                />
            </DropdownToolbar>
        </AppBar>
    );
};
