FROM ruby:3.2.0-alpine

# SQLITE
RUN apk --update add build-base tzdata sqlite-dev && rm -rf /var/cache/apk

# INIT DIR
ENV INSTALL_PATH /app/
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# BUNDLER
RUN gem install bundler

# GEMS
COPY ./Gemfile $INSTALL_PATH
COPY ./Gemfile.lock $INSTALL_PATH
RUN bundle

# INIT APP
COPY ./ $INSTALL_PATH
RUN bundle exec rails db:migrate

CMD bundle exec rails s -b 0.0.0.0 -p 3000
