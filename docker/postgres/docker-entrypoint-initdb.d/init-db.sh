#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER hitchin WITH PASSWORD 'hitchin' CREATEDB;
	CREATE DATABASE hitchin;
	GRANT ALL PRIVILEGES ON DATABASE hitchin TO hitchin;
	\c hitchin;
	GRANT ALL ON SCHEMA public TO hitchin;
EOSQL
