'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import Container from './Container';
import LanguageSelector from './LanguageSelector';
import { useI18n } from '@/contexts/I18nContext';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { t } = useI18n();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Mostra o header quando scrollar para cima e estiver abaixo de 100px do topo
            if (currentScrollY < lastScrollY && currentScrollY > 100) {
                setIsVisible(true);
            } else if (currentScrollY <= 100) {
                // Esconde quando estiver no topo
                setIsVisible(false);
            } else if (currentScrollY > lastScrollY) {
                // Esconde quando scrollar para baixo
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToTop = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }
        // Limpa o hash da URL para evitar conflitos
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
        // Limpa qualquer hash anterior antes de navegar
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        // Pequeno delay para garantir que o scroll anterior terminou
        setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Atualiza o hash após o scroll
                window.history.pushState(null, '', hash);
            }
        }, 100);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
                <Container className="!px-0">
                    <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={siteDetails.siteLogo}
                            alt={siteDetails.siteName}
                            width={28}
                            height={28}
                            className="min-w-fit w-7 h-7 object-contain"
                            priority
                        />
                        <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-6">
                        <li>
                            <button
                                onClick={(e) => scrollToTop(e)}
                                className="text-foreground hover:text-foreground-accent transition-colors"
                                aria-label={t('menu.home')}
                            >
                                {t('menu.home')}
                            </button>
                        </li>
                        {menuItems.map(item => {
                            const menuKeyMap: Record<string, string> = {
                                'Features': 'features',
                                'How It Works': 'howItWorks',
                                'Services': 'services',
                                'Testimonials': 'testimonials'
                            };
                            const key = menuKeyMap[item.text] || item.text.toLowerCase();
                            return (
                                <li key={item.text}>
                                    <a 
                                        href={item.url} 
                                        onClick={(e) => handleHashLinkClick(e, item.url)}
                                        className="text-foreground hover:text-foreground-accent transition-colors cursor-pointer"
                                    >
                                        {t(`menu.${key}`)}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <LanguageSelector />
                        </li>
                        <li>
                            <a 
                                href="#cta" 
                                onClick={(e) => handleHashLinkClick(e, '#cta')}
                                className="text-white bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors cursor-pointer"
                            >
                                {t('menu.download')}
                            </a>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <LanguageSelector />
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-white focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        <li>
                            <button
                                onClick={(e) => {
                                    scrollToTop(e);
                                    toggleMenu();
                                }}
                                className="text-foreground hover:text-primary w-full text-left"
                            >
                                {t('menu.home')}
                            </button>
                        </li>
                        {menuItems.map(item => {
                            const menuKeyMap: Record<string, string> = {
                                'Features': 'features',
                                'How It Works': 'howItWorks',
                                'Services': 'services',
                                'Testimonials': 'testimonials'
                            };
                            const key = menuKeyMap[item.text] || item.text.toLowerCase();
                            return (
                                <li key={item.text}>
                                    <a 
                                        href={item.url} 
                                        onClick={(e) => {
                                            handleHashLinkClick(e, item.url);
                                            toggleMenu();
                                        }}
                                        className="text-foreground hover:text-primary block cursor-pointer"
                                    >
                                        {t(`menu.${key}`)}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <a 
                                href="#cta" 
                                onClick={(e) => {
                                    handleHashLinkClick(e, '#cta');
                                    toggleMenu();
                                }}
                                className="text-white bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit cursor-pointer"
                            >
                                {t('menu.getStarted')}
                            </a>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>

        {/* Floating Header with Blur - aparece ao scrollar para cima */}
        <Transition
            show={isVisible}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 -translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-4"
        >
            <header className="fixed top-0 left-0 right-0 z-[60] mx-auto w-full backdrop-blur-xl bg-white/50 border-b border-white/20">
                <Container className="!px-0">
                    <nav className="mx-auto flex justify-between items-center py-5 px-5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2" onClick={scrollToTop}>
                            <Image
                                src={siteDetails.siteLogo}
                                alt={siteDetails.siteName}
                                width={28}
                                height={28}
                                className="min-w-fit w-7 h-7 object-contain"
                                priority
                            />
                            <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
                                {siteDetails.siteName}
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center space-x-6">
                            <li>
                                <button
                                    onClick={(e) => scrollToTop(e)}
                                    className="text-foreground hover:text-foreground-accent transition-colors"
                                    aria-label={t('menu.home')}
                                >
                                    {t('menu.home')}
                                </button>
                            </li>
                            {menuItems.map(item => {
                                const menuKeyMap: Record<string, string> = {
                                    'Features': 'features',
                                    'How It Works': 'howItWorks',
                                    'Services': 'services',
                                    'Testimonials': 'testimonials'
                                };
                                const key = menuKeyMap[item.text] || item.text.toLowerCase();
                                return (
                                    <li key={item.text}>
                                        <a 
                                            href={item.url} 
                                            onClick={(e) => handleHashLinkClick(e, item.url)}
                                            className="text-foreground hover:text-foreground-accent transition-colors cursor-pointer"
                                        >
                                            {t(`menu.${key}`)}
                                        </a>
                                    </li>
                                );
                            })}
                            <li>
                                <LanguageSelector />
                            </li>
                            <li>
                                <a 
                                    href="#cta" 
                                    onClick={(e) => handleHashLinkClick(e, '#cta')}
                                    className="text-white bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors cursor-pointer"
                                >
                                    {t('menu.download')}
                                </a>
                            </li>
                        </ul>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-3">
                            <LanguageSelector />
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="bg-primary text-white focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                                aria-controls="mobile-menu-floating"
                                aria-expanded={isOpen}
                            >
                                {isOpen ? (
                                    <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <HiBars3 className="h-6 w-6" aria-hidden="true" />
                                )}
                                <span className="sr-only">Toggle navigation</span>
                            </button>
                        </div>
                    </nav>
                </Container>

                {/* Mobile Menu with Transition */}
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-200 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div id="mobile-menu-floating" className="md:hidden bg-white/95 backdrop-blur-md shadow-sm">
                        <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                            <li>
                                <button
                                    onClick={() => {
                                        scrollToTop();
                                        toggleMenu();
                                    }}
                                    className="text-foreground hover:text-primary w-full text-left"
                                >
                                    {t('menu.home')}
                                </button>
                            </li>
                            {menuItems.map(item => {
                                const menuKeyMap: Record<string, string> = {
                                    'Features': 'features',
                                    'How It Works': 'howItWorks',
                                    'Services': 'services',
                                    'Testimonials': 'testimonials'
                                };
                                const key = menuKeyMap[item.text] || item.text.toLowerCase();
                                return (
                                    <li key={item.text}>
                                        <a 
                                            href={item.url} 
                                            onClick={(e) => {
                                                handleHashLinkClick(e, item.url);
                                                toggleMenu();
                                            }}
                                            className="text-foreground hover:text-primary block cursor-pointer"
                                        >
                                            {t(`menu.${key}`)}
                                        </a>
                                    </li>
                                );
                            })}
                            <li>
                                <a 
                                    href="#cta" 
                                    onClick={(e) => {
                                        handleHashLinkClick(e, '#cta');
                                        toggleMenu();
                                    }}
                                    className="text-white bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit cursor-pointer"
                                >
                                    {t('menu.getStarted')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </header>
        </Transition>
        </>
    );
};

export default Header;
