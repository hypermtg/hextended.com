require "jekyll"
require "json"

class CardTag < Liquid::Tag

    def initialize(tag_name, content, tokens)
        super
        @content = content.strip

        inputs = @content.split("|").map { |i| i.strip }

        @config = {
            card_name: inputs.shift,
        }

        @config[:text] = @config[:card_name]

        inputs.each do |input|
            key, value = input.split(':', 2)
            @config[key.to_sym] = value.strip
        end
    end

    def render(context)
        cards_path = File.join Dir.pwd, "_plugins", "scryfall-filtered-cards.json"
        if File.exist?(cards_path)
            cards = File.read cards_path
            parsed = JSON.parse(cards)

            if (!@config[:set].nil?)
                card = parsed.select {|c| c['name'].casecmp?(@config[:card_name]) && c['set'].casecmp?(@config[:set])}.first
            else
                card = parsed.select {|c| c['name'].casecmp?(@config[:card_name])}.first
            end

            if (!card.nil?)
                card_uri = URI.parse(card['scryfall_uri'])
                query_params = URI.decode_www_form('') << ["utm_source", "hextended"]
                card_uri.query = URI.encode_www_form(query_params)

                card_url = card_uri.to_s
            else
                Jekyll.logger.warn "Card Tag:", "Failed to find #{@config[:card_name]}, set: #{@config[:set]}"

                card = {}
                card['name'] = @config[:card_name]
            end
        end

        %Q{<a href="#{card_url}" title="#{ card['name'] }">#{ @config[:text] }</a>}
    end

    Liquid::Template.register_tag "card", self
end
