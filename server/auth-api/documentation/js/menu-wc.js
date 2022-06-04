'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">learning lantern Auth-api</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-35075f32846341301d06309a9ae5656974fff7467966a739477578d909f86c71b0c5bce9edb3807298bf24d95d573dd653233a3b195c635f6475e20f25be683c"' : 'data-target="#xs-injectables-links-module-AuthModule-35075f32846341301d06309a9ae5656974fff7467966a739477578d909f86c71b0c5bce9edb3807298bf24d95d573dd653233a3b195c635f6475e20f25be683c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-35075f32846341301d06309a9ae5656974fff7467966a739477578d909f86c71b0c5bce9edb3807298bf24d95d573dd653233a3b195c635f6475e20f25be683c"' :
                                        'id="xs-injectables-links-module-AuthModule-35075f32846341301d06309a9ae5656974fff7467966a739477578d909f86c71b0c5bce9edb3807298bf24d95d573dd653233a3b195c635f6475e20f25be683c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-8c21c4ae482414ac716e35b8b8da9471f4136ba255bfd1e0afd0dc61626e30c82bbf4a6f0a439edc0def2f5fefa32a666842eb242f14a224be91b8edb5a2a065"' : 'data-target="#xs-injectables-links-module-MailModule-8c21c4ae482414ac716e35b8b8da9471f4136ba255bfd1e0afd0dc61626e30c82bbf4a6f0a439edc0def2f5fefa32a666842eb242f14a224be91b8edb5a2a065"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-8c21c4ae482414ac716e35b8b8da9471f4136ba255bfd1e0afd0dc61626e30c82bbf4a6f0a439edc0def2f5fefa32a666842eb242f14a224be91b8edb5a2a065"' :
                                        'id="xs-injectables-links-module-MailModule-8c21c4ae482414ac716e35b8b8da9471f4136ba255bfd1e0afd0dc61626e30c82bbf4a6f0a439edc0def2f5fefa32a666842eb242f14a224be91b8edb5a2a065"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' : 'data-target="#xs-controllers-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' :
                                            'id="xs-controllers-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' : 'data-target="#xs-injectables-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' :
                                        'id="xs-injectables-links-module-UserModule-752d3070b8b6d3f535ee1864619a4557faa40a4add3ed552fbaddf48232c1eb75e655113e63c3e9329ae23a0c1052cbce0f1986f7a49da862f90325ac1812423"' }>
                                        <li class="link">
                                            <a href="injectables/UserHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserHelperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Profile.html" data-type="entity-link" >Profile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/SerializeInterceptor.html" data-type="entity-link" >SerializeInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializePaginatedInterceptor.html" data-type="entity-link" >SerializePaginatedInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSerializeDto.html" data-type="entity-link" >UserSerializeDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ClassConstructor.html" data-type="entity-link" >ClassConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassConstructor-1.html" data-type="entity-link" >ClassConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadI.html" data-type="entity-link" >PayloadI</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});