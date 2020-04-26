--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.24
-- Dumped by pg_dump version 11.1

-- Started on 2020-04-27 00:48:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE node;
--
-- TOC entry 2891 (class 1262 OID 16385)
-- Name: node; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE node WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect node

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 16392)
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id bigint NOT NULL,
    title character varying(250) NOT NULL,
    photo character varying,
    date date NOT NULL,
    announce character varying(250) NOT NULL,
    full_text character varying(1000),
    user_id bigint NOT NULL
);


--
-- TOC entry 177 (class 1259 OID 16544)
-- Name: articles_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles_categories (
    id bigint NOT NULL,
    article_id bigint NOT NULL,
    category_id bigint NOT NULL
);


--
-- TOC entry 178 (class 1259 OID 16563)
-- Name: articles_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 178
-- Name: articles_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_categories_id_seq OWNED BY public.articles_categories.id;


--
-- TOC entry 174 (class 1259 OID 16417)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 174
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- TOC entry 172 (class 1259 OID 16395)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    type character varying(30) NOT NULL
);


--
-- TOC entry 175 (class 1259 OID 16439)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 175
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 170 (class 1259 OID 16389)
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    avatar character varying,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    date date NOT NULL,
    text character varying NOT NULL,
    article_id bigint NOT NULL
);


--
-- TOC entry 176 (class 1259 OID 16522)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 176
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 169 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    password character varying NOT NULL,
    avatar character varying NOT NULL
);


--
-- TOC entry 173 (class 1259 OID 16406)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 173
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2761 (class 2604 OID 16419)
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- TOC entry 2763 (class 2604 OID 16565)
-- Name: articles_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_categories ALTER COLUMN id SET DEFAULT nextval('public.articles_categories_id_seq'::regclass);


--
-- TOC entry 2762 (class 2604 OID 16441)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2760 (class 2604 OID 16524)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2759 (class 2604 OID 16408)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2775 (class 2606 OID 16570)
-- Name: articles_categories articles_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_categories
    ADD CONSTRAINT articles_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2771 (class 2606 OID 16427)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 2773 (class 2606 OID 16449)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2769 (class 2606 OID 16533)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2765 (class 2606 OID 16582)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 2767 (class 2606 OID 16416)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2778 (class 2606 OID 16571)
-- Name: articles_categories articles; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_categories
    ADD CONSTRAINT articles FOREIGN KEY (article_id) REFERENCES public.articles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2777 (class 2606 OID 16539)
-- Name: articles articles_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_users FOREIGN KEY (user_id) REFERENCES public.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2779 (class 2606 OID 16576)
-- Name: articles_categories categories; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_categories
    ADD CONSTRAINT categories FOREIGN KEY (category_id) REFERENCES public.categories(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2776 (class 2606 OID 16534)
-- Name: comments comments_articles; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_articles FOREIGN KEY (article_id) REFERENCES public.articles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 2891
-- Name: DATABASE node; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON DATABASE node FROM PUBLIC;
REVOKE ALL ON DATABASE node FROM academy;
GRANT ALL ON DATABASE node TO academy;
GRANT CONNECT,TEMPORARY ON DATABASE node TO PUBLIC;


--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-04-27 00:48:05

--
-- PostgreSQL database dump complete
--

